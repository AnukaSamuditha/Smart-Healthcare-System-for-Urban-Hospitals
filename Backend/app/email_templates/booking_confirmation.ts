const ConfirmBooking = (clientName: string, QRCodeURL: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Booking Confirmed</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    color: #0f172a;
    line-height: 1.5;
  }
  
  .container {
    max-width: 420px;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 24px;
    padding: 48px 32px;
    text-align: center;
    box-shadow: 
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  
  .logo-section {
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(226, 232, 240, 0.5);
  }
  
  .logo {
    height: 70px;
    width: auto;
    opacity: 0.9;
    transition: opacity 0.2s ease;
  }
  
  .logo:hover {
    opacity: 1;
  }
  
  .success-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 24px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: scaleIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  .success-icon::after {
    content: "✓";
    color: white;
    font-size: 28px;
    font-weight: 600;
  }
  
  @keyframes scaleIn {
    0% { transform: scale(0); }
    100% { transform: scale(1); }
  }
  
  h1 {
    font-size: 28px;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 8px;
    letter-spacing: -0.025em;
  }
  
  .subtitle {
    font-size: 15px;
    color: #64748b;
    margin-bottom: 40px;
    font-weight: 400;
  }
  
  .greeting {
    font-size: 16px;
    color: #334155;
    margin-bottom: 32px;
    font-weight: 500;
  }
  
  .qr-section {
    margin: 32px 0;
    padding: 24px;
    background: #f8fafc;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
  }
  
  .qr-code img {
    width: 160px;
    height: 160px;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
  }
  
  .qr-code img:hover {
    transform: scale(1.02);
  }
  
  .qr-label {
    font-size: 13px;
    color: #64748b;
    margin-top: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 500;
  }
  
  .info-text {
    font-size: 14px;
    color: #64748b;
    margin-top: 24px;
    line-height: 1.6;
  }
  
  .footer {
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid #e2e8f0;
  }
  
  .company-name {
    font-size: 13px;
    font-weight: 600;
    color: #334155;
    margin-bottom: 4px;
    letter-spacing: 0.5px;
  }
  
  .support-link {
    font-size: 12px;
    color: #64748b;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  
  .support-link:hover {
    color: #3b82f6;
  }
  
  @media (max-width: 480px) {
    .container {
      padding: 40px 24px;
      margin: 16px;
      border-radius: 20px;
    }
    
    h1 {
      font-size: 24px;
    }
    
    .qr-code img {
      width: 140px;
      height: 140px;
    }
  }
</style>
</head>
<body>
  <div class="container">
    <div class="logo-section">
      <img src="https://raw.githubusercontent.com/AnukaSamuditha/Images/refs/heads/main/nextestate_logo.png" alt="NextEstate" class="logo" />
    </div>
    
    <div class="success-icon"></div>
    
    <h1>Booking Confirmed</h1>
    <p class="subtitle">Your visit is all set</p>
    
    <p class="greeting">Hello ${clientName}</p>
    
    <div class="qr-section">
      <div class="qr-code">
        <img src="${QRCodeURL}" alt="Your booking QR code" />
      </div>
      <p class="qr-label">Scan to validate visit</p>
    </div>
    
    <p class="info-text">
      Keep this QR code handy for property access. A copy has been sent to your email.
    </p>
    
    <div class="footer">
      <div class="company-name">NEXTESTATE</div>
      <a href="mailto:support@nextestate.com" class="support-link">
        Need help? Contact support
      </a>
    </div>
  </div>
</body>
</html>
`;

export { ConfirmBooking };