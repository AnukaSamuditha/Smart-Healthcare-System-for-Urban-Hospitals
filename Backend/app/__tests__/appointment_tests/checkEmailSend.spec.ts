import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendMail, type EmailOptionsType } from "../../utils/sendEmail.js";
import nodemailer from "nodemailer";

vi.mock("nodemailer");

describe("sendEmail functionality", () => {
  let mockSendMail: any;

  beforeEach(() => {
    mockSendMail = vi.fn((mailOptions, callback) => {
      callback(null, { messageId: "test-id", response: "250 OK" });
    });

    vi.mocked(nodemailer.createTransport).mockReturnValue({
      sendMail: mockSendMail,
    } as any);

    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  it("should send email with correct mail options", async () => {
    const mailOptions: EmailOptionsType = {
      from: "test@example.com",
      to: "recipient@example.com",
      subject: "Test Subject",
      html: "<h1>Test Email</h1>",
    };

    await sendMail(mailOptions);
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(mockSendMail).toHaveBeenCalledWith(mailOptions, expect.any(Function));
  });

  it("should log success message when email is sent", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    const mailOptions: EmailOptionsType = {
      from: "test@example.com",
      to: "recipient@example.com",
      subject: "Test",
      html: "<p>Test</p>",
    };

    await sendMail(mailOptions);
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(consoleSpy).toHaveBeenCalledWith("Email sent", expect.any(Object));
  });

  it("should handle email sending errors", async () => {
    mockSendMail.mockImplementation((mailOptions: any, callback: any) => {
      callback(new Error("Connection refused"), null);
    });

    const consoleSpy = vi.spyOn(console, "log");
    const mailOptions: EmailOptionsType = {
      from: "test@example.com",
      to: "recipient@example.com",
      subject: "Test",
      html: "<p>Test</p>",
    };

    await sendMail(mailOptions);
    await new Promise((resolve) => setTimeout(resolve, 50));

    expect(consoleSpy).toHaveBeenCalledWith("Error sending email", "Connection refused");
  });
});
