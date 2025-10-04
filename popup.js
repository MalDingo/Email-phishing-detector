document.getElementById('donateButton').addEventListener('click', () => {
  // Redirect to a donation page (e.g., PayPal or your preferred platform)
  window.open('https://yourdonationlink.com', '_blank');
  console.log("Donation link opened.");
  alert("Thank you for supporting Phishing Analyzer! You’re redirected to the donation page.");
});