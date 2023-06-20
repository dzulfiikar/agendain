import { t } from 'elysia';
const registerValidation = t.Object({
  email: t.String({ format: 'email' }),
  name: t.String(),
  password: t.String(),
  password_confirmation: t.String(),
});

export { registerValidation };
