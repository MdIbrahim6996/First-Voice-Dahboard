export type LoginFormType = {
    name: string;
};

export type LeadsFormInput = {
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
    centre: string;
    address: string;
    city: string;
    county: string;
    pincode: string;
    password: string;
    dateOfBirth: string;
    phone: string;
    comment: string;
    poa: boolean;

    process: number;
    plan: string;
    closer: string;
    verifier: string;
    fee: number;
    paymentMethod: string;
    bank: {
        bankName: string;
        accountName: string;
        accountNumber: string;
        sort: string;
    };
    card: {
        name: string;
        bankName: string;
        cardNumber: string;
        expiry: string;
        cvv: string;
    };
    appliances: { name: string; make: string; age: number }[];
    currency: string;
    shift: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    sort: string;
};
export type UpdateLeadsFormInput = {
    status: number;
    reason: string;
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
    centre: string;
    address: string;
    city: string;
    country: string;
    pincode: string;
    password: string;
    dateOfBirth: string;
    phone: string;

    fee: number;
    currency: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    sort: string;
};
