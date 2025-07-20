#!/usr/bin/env node

/**
 * End-to-End Integration Test Script
 * Tests all integration points between frontend and backend
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}`),
};

class IntegrationTester {
  constructor() {
    this.results = [];
    this.backendRunning = false;
    this.frontendRunning = false;
  }

  async run() {
    log.header('🚀 Starting Frontend-Backend Integration Tests');
    
    try {
      await this.checkPrerequisites();
      await this.startBackend();
      await this.startFrontend();
      await this.runTests();
      await this.generateReport();
    } catch (error) {
      log.error(`Integration test failed: ${error.message}`);
      process.exit(1);
    } finally {
      await this.cleanup();
    }
  }

  async checkPrerequisites() {
    log.header('📋 Checking Prerequisites');
    
    // Check if backend exists
    if (!fs.existsSync(path.join(__dirname, '../backend'))) {
      throw new Error('Backend directory not found. Please ensure backend is set up.');
    }

    // Check if .env.local exists
    if (!fs.existsSync(path.join(__dirname, '../.env.local'))) {
      log.warning('.env.local not found. Creating from example...');
      if (fs.existsSync(path.join(__dirname, '../env.example'))) {
        fs.copyFileSync(
          path.join(__dirname, '../env.example'),
          path.join(__dirname, '../.env.local')
        );
        log.success('Created .env.local from example');
      }
    }

    // Check Node.js version
    const nodeVersion = process.version;
    log.info(`Node.js version: ${nodeVersion}`);

    // Check if dependencies are installed
    if (!fs.existsSync(path.join(__dirname, '../node_modules'))) {
      log.warning('Dependencies not installed. Installing...');
      execSync('npm install', { stdio: 'inherit' });
    }

    log.success('Prerequisites check completed');
  }

  async startBackend() {
    log.header('🔧 Starting Backend Server');
    
    try {
      // Start backend in background
      const backendProcess = execSync('cd backend && npm start', {
        stdio: 'pipe',
        encoding: 'utf8',
      });
      
      this.backendRunning = true;
      log.success('Backend server started');
      
      // Wait for backend to be ready
      await this.waitForBackend();
      
    } catch (error) {
      throw new Error(`Failed to start backend: ${error.message}`);
    }
  }

  async waitForBackend() {
    log.info('Waiting for backend to be ready...');
    
    const maxAttempts = 30;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      try {
        const response = await fetch('http://localhost:4000/health');
        if (response.ok) {
          log.success('Backend is ready');
          return;
        }
      } catch (error) {
        // Continue waiting
      }
      
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    throw new Error('Backend failed to start within 30 seconds');
  }

  async startFrontend() {
    log.header('🌐 Starting Frontend Development Server');
    
    try {
      // Start frontend in background
      const frontendProcess = execSync('npm run dev', {
        stdio: 'pipe',
        encoding: 'utf8',
      });
      
      this.frontendRunning = true;
      log.success('Frontend server started');
      
      // Wait for frontend to be ready
      await this.waitForFrontend();
      
    } catch (error) {
      throw new Error(`Failed to start frontend: ${error.message}`);
    }
  }

  async waitForFrontend() {
    log.info('Waiting for frontend to be ready...');
    
    const maxAttempts = 30;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      try {
        const response = await fetch('http://localhost:3000');
        if (response.ok) {
          log.success('Frontend is ready');
          return;
        }
      } catch (error) {
        // Continue waiting
      }
      
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    throw new Error('Frontend failed to start within 30 seconds');
  }

  async runTests() {
    log.header('🧪 Running Integration Tests');
    
    const tests = [
      { name: 'API Connection Test', fn: this.testApiConnection.bind(this) },
      { name: 'Authentication Flow Test', fn: this.testAuthentication.bind(this) },
      { name: 'Document Management Test', fn: this.testDocumentManagement.bind(this) },
      { name: 'Role-Based Access Test', fn: this.testRoleBasedAccess.bind(this) },
      { name: 'Error Handling Test', fn: this.testErrorHandling.bind(this) },
      { name: 'SSR/SSG Test', fn: this.testSSR.bind(this) },
    ];

    for (const test of tests) {
      try {
        log.info(`Running ${test.name}...`);
        await test.fn();
        this.results.push({ name: test.name, status: 'PASS' });
        log.success(`${test.name} passed`);
      } catch (error) {
        this.results.push({ name: test.name, status: 'FAIL', error: error.message });
        log.error(`${test.name} failed: ${error.message}`);
      }
    }
  }

  async testApiConnection() {
    const response = await fetch('http://localhost:4000/');
    if (!response.ok) {
      throw new Error(`API connection failed: ${response.status}`);
    }
    
    const data = await response.json();
    if (!data.message) {
      throw new Error('Invalid API response format');
    }
  }

  async testAuthentication() {
    // Test registration
    const registerResponse = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'user'
      })
    });

    if (!registerResponse.ok) {
      throw new Error(`Registration failed: ${registerResponse.status}`);
    }

    // Test login
    const loginResponse = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });

    if (!loginResponse.ok) {
      throw new Error(`Login failed: ${loginResponse.status}`);
    }

    const loginData = await loginResponse.json();
    if (!loginData.token) {
      throw new Error('Login response missing token');
    }
  }

  async testDocumentManagement() {
    // Test document listing
    const listResponse = await fetch('http://localhost:4000/api/documents');
    if (!listResponse.ok) {
      throw new Error(`Document listing failed: ${listResponse.status}`);
    }

    const listData = await listResponse.json();
    if (!Array.isArray(listData.documents)) {
      throw new Error('Document listing response format invalid');
    }
  }

  async testRoleBasedAccess() {
    // Test protected endpoint without auth
    const protectedResponse = await fetch('http://localhost:4000/api/documents', {
      headers: { 'Authorization': 'Bearer invalid-token' }
    });

    if (protectedResponse.status !== 401) {
      throw new Error('Protected endpoint should return 401 for invalid token');
    }
  }

  async testErrorHandling() {
    // Test 404 endpoint
    const notFoundResponse = await fetch('http://localhost:4000/api/nonexistent');
    if (notFoundResponse.status !== 404) {
      throw new Error('Non-existent endpoint should return 404');
    }
  }

  async testSSR() {
    // Test that frontend pages load
    const pages = ['/', '/projects', '/team', '/technology'];
    
    for (const page of pages) {
      const response = await fetch(`http://localhost:3000${page}`);
      if (!response.ok) {
        throw new Error(`Page ${page} failed to load: ${response.status}`);
      }
    }
  }

  async generateReport() {
    log.header('📊 Integration Test Report');
    
    const passed = this.results.filter(r => r.status === 'PASS').length;
    const failed = this.results.filter(r => r.status === 'FAIL').length;
    const total = this.results.length;
    
    console.log(`\n${colors.bright}Test Results:${colors.reset}`);
    console.log(`${colors.green}Passed: ${passed}${colors.reset}`);
    console.log(`${colors.red}Failed: ${failed}${colors.reset}`);
    console.log(`${colors.blue}Total: ${total}${colors.reset}`);
    
    console.log(`\n${colors.bright}Detailed Results:${colors.reset}`);
    this.results.forEach(result => {
      const status = result.status === 'PASS' 
        ? `${colors.green}✓${colors.reset}` 
        : `${colors.red}✗${colors.reset}`;
      console.log(`${status} ${result.name}`);
      if (result.error) {
        console.log(`   ${colors.red}Error: ${result.error}${colors.reset}`);
      }
    });
    
    // Save report to file
    const reportPath = path.join(__dirname, '../integration-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      results: this.results,
      summary: { passed, failed, total }
    }, null, 2));
    
    log.success(`Report saved to ${reportPath}`);
    
    if (failed > 0) {
      throw new Error(`${failed} tests failed`);
    }
  }

  async cleanup() {
    log.header('🧹 Cleaning Up');
    
    // Stop servers
    if (this.backendRunning) {
      try {
        execSync('pkill -f "node.*backend"', { stdio: 'ignore' });
        log.info('Backend server stopped');
      } catch (error) {
        log.warning('Could not stop backend server');
      }
    }
    
    if (this.frontendRunning) {
      try {
        execSync('pkill -f "next.*dev"', { stdio: 'ignore' });
        log.info('Frontend server stopped');
      } catch (error) {
        log.warning('Could not stop frontend server');
      }
    }
  }
}

// Run the integration tests
if (require.main === module) {
  const tester = new IntegrationTester();
  tester.run().catch(error => {
    log.error(`Integration test failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = IntegrationTester; 