const Booking_Template = (
  ownerName: string,
  propertyTitle: string,
  propertyAddress: string,
  bookingId: string,
  bookingDate: Date,
  guestName: string,
  guestEmail: string,
  guestPhone: string,
  slotDate: Date,
  slotStart: string,
  slotEnd: string,
  notes: string,
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Notification</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
      margin: 0;
      padding: 20px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 
        0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
    
    .header {
      padding: 32px 32px 0;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .logo {
      width: auto;
      height: 70px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 20px;
      letter-spacing: -0.5px;
    }
    
    .brand-info {
      flex: 1;
    }
    
    .brand-name {
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 2px;
      letter-spacing: -0.025em;
    }
    
    .brand-subtitle {
      font-size: 13px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 500;
    }
    
    .notification-badge {
      background: #fef3c7;
      color: #d97706;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .content {
      padding: 32px;
    }
    
    .title {
      font-size: 24px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 8px;
      letter-spacing: -0.025em;
    }
    
    .greeting {
      font-size: 16px;
      color: #374151;
      margin-bottom: 20px;
      line-height: 1.5;
    }
    
    .description {
      font-size: 15px;
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 32px;
    }
    
    .booking-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 32px;
    }
    
    .booking-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
      gap: 20px;
    }
    
    .booking-row:last-of-type {
      margin-bottom: 0;
    }
    
    .booking-section {
      flex: 1;
    }
    
    .booking-section.right {
      text-align: right;
    }
    
    .section-label {
      font-size: 11px;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-weight: 600;
      margin-bottom: 6px;
    }
    
    .section-value {
      font-size: 15px;
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 4px;
    }
    
    .section-meta {
      font-size: 13px;
      color: #64748b;
      line-height: 1.4;
    }
    
    .notes-section {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
    }
    
    .notes-content {
      font-size: 14px;
      color: #374151;
      line-height: 1.5;
      margin-top: 8px;
      font-style: italic;
    }
    
    .actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: white;
      padding: 14px 24px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      font-size: 15px;
      transition: all 0.2s ease;
      box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.25);
    }
    
    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 15px -3px rgba(59, 130, 246, 0.3);
    }
    
    .btn-secondary {
      background: transparent;
      color: #374151;
      padding: 14px 24px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      font-size: 15px;
      transition: all 0.2s ease;
    }
    
    .btn-secondary:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
    }
    
    .footer {
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      padding: 24px 32px;
      border-radius: 0 0 20px 20px;
    }
    
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
      gap: 20px;
    }
    
    .footer-brand {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 4px;
    }
    
    .footer-address {
      font-size: 12px;
      color: #64748b;
      line-height: 1.4;
    }
    
    .footer-copyright {
      font-size: 12px;
      color: #94a3b8;
      text-align: right;
    }
    
    .footer-unsubscribe {
      font-size: 11px;
      color: #94a3b8;
      line-height: 1.4;
    }
    
    .footer-unsubscribe a {
      color: #3b82f6;
      text-decoration: none;
    }
    
    .footer-unsubscribe a:hover {
      text-decoration: underline;
    }
    
    @media (max-width: 640px) {
      body {
        padding: 16px;
      }
      
      .header {
        padding: 24px 24px 0;
        flex-direction: column;
        text-align: center;
        gap: 12px;
      }
      
      .content {
        padding: 24px;
      }
      
      .title {
        font-size: 22px;
      }
      
      .booking-row {
        flex-direction: column;
        gap: 16px;
      }
      
      .booking-section.right {
        text-align: left;
      }
      
      .actions {
        flex-direction: column;
      }
      
      .footer {
        padding: 20px 24px;
      }
      
      .footer-content {
        flex-direction: column;
        gap: 12px;
      }
      
      .footer-copyright {
        text-align: left;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="logo">
        <img src="https://raw.githubusercontent.com/AnukaSamuditha/Images/refs/heads/main/nextestate_logo.png" alt="NextEstate" class="logo" />
      </div>
      <div class="brand-info">
        <div class="brand-name">NextEstate</div>
        <div class="brand-subtitle">Property Management</div>
      </div>
      <div class="notification-badge">New Booking</div>
    </div>
    
    <div class="content">
      <h1 class="title">New booking received</h1>
      <p class="greeting">Hello <strong>${ownerName}</strong>,</p>
      <p class="description">
        A visitor has requested a viewing for your property. Please review the booking details below and confirm the appointment.
      </p>
      
      <div class="booking-card">
        <div class="booking-row">
          <div class="booking-section">
            <div class="section-label">Property</div>
            <div class="section-value">${propertyTitle}</div>
            <div class="section-meta">${propertyAddress}</div>
          </div>
          <div class="booking-section right">
            <div class="section-label">Booking ID</div>
            <div class="section-value">${bookingId}</div>
            <div class="section-meta">Created: ${bookingDate.toLocaleDateString()}</div>
          </div>
        </div>
        
        <div class="booking-row">
          <div class="booking-section">
            <div class="section-label">Visitor</div>
            <div class="section-value">${guestName}</div>
            <div class="section-meta">${guestEmail}<br>${guestPhone}</div>
          </div>
          <div class="booking-section right">
            <div class="section-label">Viewing Slot</div>
            <div class="section-value">${slotDate.toLocaleDateString()}</div>
            <div class="section-meta">${slotStart} – ${slotEnd}</div>
          </div>
        </div>
        
        ${
          notes
            ? `
        <div class="notes-section">
          <div class="section-label">Additional Notes</div>
          <div class="notes-content">"${notes}"</div>
        </div>
        `
            : ""
        }
      </div>
    </div>
    
    <div class="footer">
      <div class="footer-content">
        <div>
          <div class="footer-brand">NextEstate</div>
          <div class="footer-address">
            123 Main Street, City<br>
            support@nextestate.com
          </div>
        </div>
        <div class="footer-copyright">
          © 2025 NextEstate
        </div>
      </div>
      
      <div class="footer-unsubscribe">
        You received this email because you own the listed property. 
        <a href="{{unsubscribeUrl}}">Unsubscribe</a> from booking notifications.
      </div>
    </div>
  </div>
</body>
</html>
`;

export { Booking_Template };