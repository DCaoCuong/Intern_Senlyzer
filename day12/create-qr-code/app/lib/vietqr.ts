
function crc16(buffer: string) {
    let crc = 0xffff;
    for (let i = 0; i < buffer.length; i++) {
        crc = ((crc >> 8) | (crc << 8)) & 0xffff;
        crc ^= buffer.charCodeAt(i) & 0xff;
        crc ^= (crc & 0xff) >> 4;
        crc ^= (crc << 12) & 0xffff;
        crc ^= (crc & 0xff) << 5;
    }
    crc &= 0xffff;
    return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function generateVietQRData(
    bankBin: string,
    accountNumber: string,
    amount?: string,
    description?: string
) {
    // 00: Payload Format Indicator
    let qrString = "000201";

    // 01: Point of Initiation Method (12: Static, 11: Dynamic - we use 12 for static usually or 11 if amount is present, but 12 is safer for general transfers usually, actually 11 is needed if amount is specific?)
    // VietQR usually uses 12 if dynamic not forced. Let's use 12.
    // Actually, if amount is present, it should ideally be 12 (Dynamic)? No, 12 is dynamic? 11 is static?
    // 010211 (Static) / 010212 (Dynamic). 
    // If amount is present, let's use 12. If not, 11.
    qrString += amount ? "010212" : "010211";

    // 38: Merchant Account Information
    // GUID: A000000727 (NAPAS)
    // Service Code: QRIBFTTA (Fast Transfer)
    const guid = "A000000727";
    const serviceCode = "QRIBFTTA";

    // Consumer Account Information (Bank BIN + Account Number)
    // 00: GUID
    // 01: Beneficiary Bank (Bin + Account)

    // Sub-tag 00: GUID
    const tag00 = `00${guid.length.toString().padStart(2, "0")}${guid}`;

    // Sub-tag 01: Bank Bin + Account
    const bankInfo = `0006${bankBin}01${accountNumber.length
        .toString()
        .padStart(2, "0")}${accountNumber}`;
    const tag01 = `01${bankInfo.length.toString().padStart(2, "0")}${bankInfo}`;

    // Sub-tag 02: Service Code
    const tag02 = `02${serviceCode.length.toString().padStart(2, "0")}${serviceCode}`;

    const merchantAccountInfo = `${tag00}${tag01}${tag02}`;
    qrString += `38${merchantAccountInfo.length.toString().padStart(2, "0")}${merchantAccountInfo}`;

    // 53: Transaction Currency
    qrString += "5303704"; // VND

    // 54: Transaction Amount (optional)
    if (amount) {
        qrString += `54${amount.length.toString().padStart(2, "0")}${amount}`;
    }

    // 58: Country Code
    qrString += "5802VN";

    // 62: Additional Data Field Template
    // 08: Purpose of Transaction
    let additionalData = "";
    if (description) {
        const descTag = `08${description.length.toString().padStart(2, "0")}${description}`;
        additionalData += descTag;
    }

    if (additionalData) {
        qrString += `62${additionalData.length.toString().padStart(2, "0")}${additionalData}`;
    }

    // 63: CRC
    qrString += "6304";
    const crc = crc16(qrString);
    qrString += crc;

    return qrString;
}
