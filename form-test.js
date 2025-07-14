// Test script for form submission functionality
// Run this in browser console to test the form

async function testFormSubmission() {
  console.log('🧪 Testing DOGANVENTURES form submission...');
  
  // Test data
  const testData = {
    name: 'Test Kullanıcı',
    email: 'test@example.com',
    phone: '+90 555 123 4567',
    business: 'Test İşletmesi',
    monthly_revenue: '10000-50000',
    biggest_challenge: 'Müşteri bulmak',
    desired_outcome: 'Satışları artırmak',
    timeline: '1-3 ay'
  };

  try {
    // Get the form
    const form = document.querySelector('form');
    if (!form) {
      console.error('❌ Form not found!');
      return;
    }

    // Fill the form
    Object.keys(testData).forEach(key => {
      const input = form.querySelector(`[name="${key}"]`);
      if (input) {
        input.value = testData[key];
        console.log(`✅ Filled ${key}: ${testData[key]}`);
      }
    });

    console.log('📝 Form filled with test data');
    console.log('💡 Now manually click the submit button to test!');
    console.log('📊 Check Supabase dashboard for new lead entry');
    console.log('📱 Check Telegram for notification');
    
    // Highlight the submit button
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.style.border = '3px solid #ff0000';
      submitButton.style.animation = 'pulse 1s infinite';
      console.log('🔴 Submit button highlighted in red');
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Add CSS for button animation
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(style);

// Run the test
testFormSubmission();

console.log(`
🎯 DOGANVENTURES Form Test Ready!
=====================================
1. Form has been filled with test data
2. Click the red-highlighted submit button
3. Check results:
   - Browser console for success/error messages
   - Supabase dashboard for new lead
   - Telegram for notification

To run this test again, type: testFormSubmission()
`);
