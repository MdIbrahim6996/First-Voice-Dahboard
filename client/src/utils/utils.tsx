export const returnColors = (status: string) => {
    switch (status) {
        case "pending":
            return "#FFFE71";
        case "success":
            return "#ACE1AF";
        case "cancelled":
            return "#C81D11";
        default:
            return "";
    }
};
