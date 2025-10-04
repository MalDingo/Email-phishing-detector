console.log("Content script loaded!"); 

function analyzeOpenedEmail() {

  const emailContainer = document.querySelector('.adn.ads'); 
  if (!emailContainer) {
    console.log("Not on an opened email. Waiting...");
    return;
  }

  console.log("Analyzing opened email...");
 
  const sender = emailContainer.querySelector('[email]')?.getAttribute('email') || 'Unknown sender';
  const subject = emailContainer.querySelector('.hP')?.textContent.trim() || 'No subject'; 
  const body = emailContainer.querySelector('.a3s')?.textContent.toLowerCase() || 'No body';
  const links = emailContainer.querySelectorAll('a[href]');
  const linkUrls = Array.from(links).map(link => link.href);

 
  let risks = [];
  const suspiciousKeywords = ['urgent', 'account suspended', 'verify now', 'click here to login', 'winner', 'free gift'];
  suspiciousKeywords.forEach(keyword => {
    if (body.includes(keyword)) risks.push(`Suspicious keyword: ${keyword}`);
  });
  if (sender.includes('bank') && !sender.match(/@.*bank\.com$/)) risks.push('Sender domain mismatch');
  linkUrls.forEach(url => {
    if (!url.startsWith('https://')) risks.push(`Risky link: ${url}`);
  });

 
  const analysis = [
    `Sender: ${sender}`,
    `Subject: ${subject}`,
    `Keywords found: ${suspiciousKeywords.filter(k => body.includes(k)).join(', ') || 'None'}`
  ];


  const analysisBox = document.createElement('div');
  analysisBox.className = 'analysis-box';
  analysisBox.style.cssText = 'background: #f0f0f0; color: black; padding: 8px 12px; margin: 0; border-radius: 4px; font-size: 12px; z-index: 999999; position: fixed; top: 60px; left: 50%; transform: translateX(-50%); box-shadow: 0 2px 6px rgba(0,0,0,0.15)';
  if (risks.length > 0) {
    analysisBox.style.background = '#ff4444';
    analysisBox.style.color = 'white';
    analysisBox.innerHTML = `
      <strong>⚠️ Potential Phishing Detected!</strong><br>
      Risks: ${risks.join('<br>')}<br><br>
      Analysis:<br>${analysis.join('<br>')}
      <button id="closeButton" style="background: none; border: 1px solid; padding: 2px 6px; font-size: 10px; cursor: pointer; margin-top: 5px; float: right;">X</button>
    `;
    emailContainer.style.border = '2px solid red';
  } else {
    analysisBox.style.background = '#44ff44';
    analysisBox.style.color = 'black';
    analysisBox.innerHTML = `
      <strong>✅ Email Appears Safe</strong><br><br>
      Analysis:<br>${analysis.join('<br>')}
      <button id="closeButton" style="background: none; border: 1px solid; padding: 2px 6px; font-size: 10px; cursor: pointer; margin-top: 5px; float: right;">X</button>
    `;
    emailContainer.style.border = '2px solid green';
  }

  const closeButton = analysisBox.querySelector('#closeButton');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      analysisBox.remove();
      console.log("Analysis box closed by user.");
    });
  }


  const existingBox = emailContainer.querySelector('.analysis-box');
  if (existingBox) existingBox.replaceWith(analysisBox);
  else emailContainer.appendChild(analysisBox);
  console.log("Analysis complete:", { risks, analysis });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    analyzeOpenedEmail();
    setInterval(analyzeOpenedEmail, 1000); 
  });
} else {
  analyzeOpenedEmail();
  setInterval(analyzeOpenedEmail, 1000);
}