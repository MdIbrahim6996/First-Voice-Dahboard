export const returnColors = (status: string) => {
    switch (status) {
        case "pending":
            return "#FFFE71";
        case "success":
            return "#ACE1AF";
        case "cancelled":
            return "#C81D11";
        case "rework/warmup":
            return "#0070BB";
        default:
            return "";
    }
};

export const formatNumber = (number: number) =>
    number < 10 ? `0${number}` : number;

export const filterStatus = (status: any) => {
    return status?.filter((item: any) => item?.name === "paid" || "refund");
};
