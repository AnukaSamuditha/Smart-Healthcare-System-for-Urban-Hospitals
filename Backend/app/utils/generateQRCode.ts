import qrcode from "qrcode";

const generateBookingQRCode = async (bookingID: string): Promise<string> => {
  try {
    if (!bookingID) {
      throw new Error(
        "Booking ID is compulsory to generate the booking QR code",
      );
    }
    const qrDataURL = await qrcode.toDataURL(bookingID, {
      errorCorrectionLevel: "H",
      type: "image/png",
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff00",
      },
    });

    return qrDataURL;
  } catch (error) {
    console.log("QR code generation failed! ", error);
    throw error;
  }
};

export default generateBookingQRCode;