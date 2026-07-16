import { createServer } from 'vite'
import { chromium } from 'playwright'

async function runDiagnostics() {
  console.log('🚀 Starting Vite Dev Server programmatically...')
  const server = await createServer({
    server: {
      port: 5173,
      host: 'localhost',
    },
  })

  try {
    await server.listen()
    console.log('✅ Dev server is running at http://localhost:5173')

    console.log('🌐 Launching Playwright browser...')
    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext()
    const page = await context.newPage()

    // Track console messages and errors
    const consoleLogs = []
    const pageErrors = []

    page.on('console', (msg) => {
      const text = msg.text()
      const type = msg.type()
      consoleLogs.push({ type, text })
      if (type === 'error') {
        console.log(`❌ Page Console Error: ${text}`)
      }
    })

    page.on('pageerror', (err) => {
      pageErrors.push(err.message)
      console.log(`❌ Unhandled Exception: ${err.message}`)
    })

    console.log('🔗 Navigating to the portfolio page...')
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })

    console.log('🔍 Running visual and element diagnostics...')
    const checks = {
      title: await page.title(),
      hasHero: (await page.$('#hero')) !== null,
      hasWelcome: (await page.$('#welcome')) !== null,
      hasAbout: (await page.$('#about')) !== null,
      hasExperience: (await page.$('#experience')) !== null,
      hasProjects: (await page.$('#projects')) !== null,
      hasServices: (await page.$('#services')) !== null,
      hasContact: (await page.$('#contact')) !== null,
    }

    console.log('\n📋 Diagnostic Report:')
    console.log(`  - Page Title: "${checks.title}"`)
    console.log(`  - Hero Section Exists: ${checks.hasHero ? '✅ Yes' : '❌ No'}`)
    console.log(`  - Welcome Section Exists: ${checks.hasWelcome ? '✅ Yes' : '❌ No'}`)
    console.log(`  - About Section Exists: ${checks.hasAbout ? '✅ Yes' : '❌ No'}`)
    console.log(`  - Experience Section Exists: ${checks.hasExperience ? '✅ Yes' : '❌ No'}`)
    console.log(`  - Projects Section Exists: ${checks.hasProjects ? '✅ Yes' : '❌ No'}`)
    console.log(`  - Services Section Exists: ${checks.hasServices ? '✅ Yes' : '❌ No'}`)
    console.log(`  - Contact Section Exists: ${checks.hasContact ? '✅ Yes' : '❌ No'}`)
    console.log(`  - Total Console Warnings/Errors: ${consoleLogs.filter(l => l.type === 'warning' || l.type === 'error').length}`)
    console.log(`  - Unhandled Page Errors: ${pageErrors.length}`)

    console.log('\n🧹 Cleaning up browser and page contexts...')
    await page.close()
    await context.close()
    await browser.close()
    console.log('✅ Browser closed successfully.')

    if (pageErrors.length > 0) {
      console.error('\n⚠️ Diagnostics Failed: Unhandled exceptions were found on the page.')
      process.exit(1)
    } else {
      console.log('\n🎉 Diagnostics Passed: Portfolio UI is running and stable.')
    }
  } catch (error) {
    console.error('❌ Diagnostic error occurred:', error)
    process.exit(1)
  } finally {
    console.log('🛑 Stopping Vite Dev Server...')
    await server.close()
    console.log('✅ Dev server stopped.')
  }
}

runDiagnostics()
