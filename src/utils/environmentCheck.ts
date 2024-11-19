/**
 * Checks if required environment variables are present
 * @throws Error if any required variable is missing
 */
export function checkRequiredEnvVars(): void {
    const requiredVars = [
        'BASE_API',
        'PORT',
        'SESSION_SECRET',
        'ISSUER',
        'AUTHORIZATION_URL',
        'TOKEN_URL',
        'USER_INFO_URL',
        'CLIENT_ID',
        'CLIENT_SECRET',
        'REDIRECT_URL',
        // Add other required vars here
    ];

    const missingVars = requiredVars.filter((varName) => !process.env[varName]);

    if (missingVars.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missingVars.join(', ')}`,
        );
    }
}
