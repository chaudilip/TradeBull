# NestJS CLI Cheat Sheet – Feature-Based `client-oauth2`

> **Assumption:** You are inside the microservice folder:
> `cd app/microservices/client-oauth2`

---

## 1. Generate a Controller

```bash
# Standard: Creates a folder for the controller
nest g co features/<feature_name>/<controller_name>

# Example: Add RefreshController in OAuth feature
nest g co features/oauth/refresh

# Flat: Creates file without extra folder
nest g co features/oauth/refresh --flat

# Skip spec file
nest g co features/oauth/refresh --no-spec
```

- Generated file: `src/features/oauth/refresh.controller.ts`
- Decorator added: `@Controller('refresh')`

---

## 2. Generate a Service

```bash
# Standard
nest g s features/<feature_name>/<service_name>

# Example: Add RefreshService
nest g s features/oauth/refresh

# Skip spec
nest g s features/oauth/refresh --no-spec
```

- Generated file: `src/features/oauth/refresh.service.ts`
- Decorator added: `@Injectable()`

---

## 3. Generate a Module

```bash
nest g mo features/<feature_name>/<module_name>

# Example: Add PaymentsModule
nest g mo features/payments
```

- Generated file: `src/features/payments/payments.module.ts`
- Registers a module for controllers and providers in that feature

---

## 4. Generate a DTO (Data Transfer Object)

```bash
# Generate a class for DTO
nest g class features/<feature_name>/dto/<dto_name>

# Example: Create LoginDto for Auth
nest g class features/auth/dto/login.dto --no-spec
```

- Decorator not needed; just a plain TypeScript class for validation.

---

## 5. Generate a Guard

```bash
nest g guard features/<feature_name>/guards/<guard_name>

# Example: AuthGuard for Auth feature
nest g guard features/auth/guards/auth --no-spec
```

- Adds `@Injectable()` and implements `CanActivate`.

---

## 6. Generate a Pipe

```bash
nest g pipe features/<feature_name>/pipes/<pipe_name> --no-spec
```

- Useful for validation or transformation.

---

## 7. Generate an Interceptor

```bash
nest g interceptor features/<feature_name>/interceptors/<interceptor_name> --no-spec
```

- Useful for logging, transforming responses, etc.

---

## 8. Generate a Custom Decorator

```bash
nest g decorator features/<feature_name>/decorators/<decorator_name>
```

- Useful for roles, permissions, or request transformations.

---

## 9. Generate an Enum

```bash
nest g enum features/<feature_name>/enums/<enum_name>
```

---

## 10. Generate a Middleware

```bash
nest g middleware features/<feature_name>/middleware/<middleware_name>
```

- Decorator: `@Injectable()`
- Can be applied in the module `configure()` method

---

## 11. Example Workflow: Add `RefreshToken` Feature

```bash
nest g mo features/oauth/refresh --no-spec
nest g co features/oauth/refresh/refresh --flat --no-spec
nest g s features/oauth/refresh/refresh --no-spec
nest g class features/oauth/refresh/dto/refresh-token.dto --no-spec
```

- Creates module, controller, service, and DTO inside `OAuth` feature.
- Import `RefreshModule` in `OauthModule`.

---

## 12. Notes for Feature-Based Architecture

1. Always **run CLI from microservice root** to respect paths and `tsconfig.json`.
2. Use **`--flat`** if you don’t want extra folders inside features.
3. CLI auto-updates the nearest module if you generate inside a module folder (recommended).
4. Keep **dto/, guards/, pipes/, interceptors/** inside the feature for modularity.

---

**Tip:** This cheat sheet allows you to **quickly generate controllers, services, modules, and other files** for your feature-based NestJS microservice without worrying about paths or boi
