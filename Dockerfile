# Build stage
FROM oven/bun:1 AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies (ignore optional deps and skip build scripts)
RUN bun install --frozen-lockfile --ignore-scripts

# Copy application code
COPY . .

# Build the application
RUN bun run build

# Runtime stage
FROM oven/bun:1-alpine

# Set working directory
WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copy package files
COPY package.json bun.lock* ./

# Install production dependencies (ignore optional deps and skip build scripts)
RUN bun install --frozen-lockfile --production --ignore-scripts

# Copy built application from builder
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/next.config.ts ./next.config.ts

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD bun -e "await fetch('http://localhost:3000'); process.exit(0)"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["bun", "start"]
