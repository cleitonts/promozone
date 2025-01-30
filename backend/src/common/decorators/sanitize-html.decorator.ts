import { Transform } from 'class-transformer';
import sanitizeHtml from 'sanitize-html';

export function SanitizeHTML() {
  return Transform(({ value }) =>
    sanitizeHtml(value, {
      allowedTags: ['p', 'a', 'strong', 'em', 'ul', 'ol', 'li'],
      allowedAttributes: {
        a: ['href'],
      },
    }),
  );
}
