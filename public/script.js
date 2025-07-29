document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const message = document.getElementById('message').value;

  const response = await fetch('/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, message })
  });

  const text = await response.text();
  document.getElementById('responseMsg').innerText = text;
});

document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  try {
    const response = await fetch('https://contact-backend-service.onrender.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();

    if (result.success) {
      alert('✅ Message submitted successfully!');
      document.getElementById('contactForm').reset();
    } else {
      alert('❌ Submission failed. Please try again.');
    }
  } catch (error) {
    console.error('❌ Error submitting form:', error);
    alert('🚫 Server error. Please try again later.');
  }
});
