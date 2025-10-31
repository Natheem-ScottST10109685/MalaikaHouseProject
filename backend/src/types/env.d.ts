declare namespace NodeJS {
  interface ProcessEnv {
    ADMIN_EMAIL?: string;
    FROM_EMAIL?: string;
    FROM_NAME?: string;
    SMTP_HOST?: string;
    SMTP_PORT?: string;
    SMTP_SECURE?: string;
    SMTP_USER?: string;
    SMTP_PASS?: string;
  }
}
