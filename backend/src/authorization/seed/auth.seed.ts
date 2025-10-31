import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/user/user.entity';
import { TenantEntity } from '@/tenant/tenant.entity';
import { ProfileEntity } from '@/profile/profile.entity';
import * as bcrypt from 'bcrypt';
import { UlidUtil } from '@/common/ulid.util';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async run() {
    const adminEmail = 'admin@admin.com';
    const ownerEmail = 'test.owner@demo.com';
    const userEmail = 'test.user@demo.com';

    let admin = await this.userRepository.findOne({ where: { email: adminEmail } });
    if (!admin) {
      admin = this.userRepository.create({
        id: UlidUtil.generate(),
        name: { first: 'Admin', last: 'User' },
        email: adminEmail,
        password: await bcrypt.hash('admin', 10),
        active: true,
        roles: ['admin'],
      });
      await this.userRepository.save(admin);
    }

    let testOwner = await this.userRepository.findOne({ where: { email: ownerEmail } });
    if (!testOwner) {
      testOwner = this.userRepository.create({
        id: UlidUtil.generate(),
        name: { first: 'Test', last: 'Owner' },
        email: ownerEmail,
        password: await bcrypt.hash('admin', 10),
        active: true,
        roles: ['viewer'],
      });
      await this.userRepository.save(testOwner);
    }

    let testUser = await this.userRepository.findOne({ where: { email: userEmail } });
    if (!testUser) {
      testUser = this.userRepository.create({
        id: UlidUtil.generate(),
        name: { first: 'Test', last: 'User' },
        email: userEmail,
        password: await bcrypt.hash('admin', 10),
        active: true,
        roles: ['viewer'],
      });
      await this.userRepository.save(testUser);
    }

    let tenantTest = await this.tenantRepository.findOne({ where: { name: 'Tenant Test' } });
    if (!tenantTest) {
      tenantTest = this.tenantRepository.create({
        id: UlidUtil.generate(),
        name: 'Tenant Test',
        ownerId: testOwner.id,
      });
      await this.tenantRepository.save(tenantTest);
    } else if (!tenantTest.ownerId) {
      tenantTest.ownerId = testOwner.id;
      await this.tenantRepository.save(tenantTest);
    }

    let viewProfile = await this.profileRepository.findOne({ where: { tenantId: tenantTest.id } });
    if (!viewProfile) {
      viewProfile = this.profileRepository.create({
        id: UlidUtil.generate(),
        tenantId: tenantTest.id,
        resolvers: [
          'Tenant.findTenants',
          'Tenant.findTenant',
          'User.findUsers',
          'User.findUser',
        ],
      });
      await this.profileRepository.save(viewProfile);
    }

    const ownerWithProfiles = await this.userRepository.findOne({ where: { id: testOwner.id }, relations: ['profiles'] });
    const userWithProfiles = await this.userRepository.findOne({ where: { id: testUser.id }, relations: ['profiles'] });

    const ownerProfiles = ownerWithProfiles?.profiles ?? [];
    const userProfiles = userWithProfiles?.profiles ?? [];

    const hasOwnerProfile = ownerProfiles.some((p) => p.id === viewProfile.id);
    const hasUserProfile = userProfiles.some((p) => p.id === viewProfile.id);

    if (!hasOwnerProfile) {
      testOwner.profiles = [...ownerProfiles, viewProfile];
      await this.userRepository.save(testOwner);
    }
    if (!hasUserProfile) {
      testUser.profiles = [...userProfiles, viewProfile];
      await this.userRepository.save(testUser);
    }

    console.log('Seed data ensured successfully');
  }
}
