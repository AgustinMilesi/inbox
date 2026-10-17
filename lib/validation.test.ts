import test from "node:test";
import assert from "node:assert/strict";
import { publicMessageSchema, registerSchema, contactSchema } from "./validation";

test("publicMessageSchema accepts valid visitor contact inputs", () => {
  const result = publicMessageSchema.safeParse({
    name: "John Doe",
    email: "john@example.com",
    subject: "Inquiry about CRM",
    message: "Hello, I would like to learn more about the pricing.",
  });
  assert.equal(result.success, true);
});

test("publicMessageSchema detects honeypot field presence", () => {
  const result = publicMessageSchema.safeParse({
    name: "Bot User",
    email: "bot@spam.com",
    subject: "Cheap deals",
    message: "Click here to buy stuff now online.",
    website: "https://spam.com",
  });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.website, "https://spam.com");
  }
});

test("publicMessageSchema rejects short message", () => {
  const result = publicMessageSchema.safeParse({
    name: "John Doe",
    email: "john@example.com",
    subject: "Inquiry",
    message: "Hi",
  });
  assert.equal(result.success, false);
});

test("registerSchema requires strong password of at least 10 chars", () => {
  const shortPass = registerSchema.safeParse({
    name: "Jane",
    organization: "Acme",
    email: "jane@acme.com",
    password: "short",
  });
  assert.equal(shortPass.success, false);

  const goodPass = registerSchema.safeParse({
    name: "Jane",
    organization: "Acme",
    email: "jane@acme.com",
    password: "secure_password_123",
  });
  assert.equal(goodPass.success, true);
});

test("contactSchema validates phone, email, and externalId", () => {
  const valid = contactSchema.safeParse({
    name: "Alice Smith",
    email: "alice@company.com",
    phone: "+1 555 1234",
    company: "Smith Enterprises",
    externalId: "ERP-CUST-992",
  });
  assert.equal(valid.success, true);
});
