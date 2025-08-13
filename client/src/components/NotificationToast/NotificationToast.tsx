import toast from "react-hot-toast";

interface INotificationProps {
    data: {
        id: 31;
        userId: 1;
        title: string;
        content: string;
        type: string;
        saleDate: Date;
        createdAt: Date;
        updatedAt: Date;
    };
}

const NotificationToast = ({ data }: INotificationProps) => {
    // const item = {
    //     id: 1,
    //     type: "urgent",
    //     title: "Lead status changed",
    //     description:
    //         "Lead with id: 2 changed status from CANCELLED   --->   SUCCESS",
    // };
    console.log(data);
    return (
        <article
            onClick={() => toast.dismiss()}
            key={data.id}
            className={`px-4 py-2 rounded-md shadow-lg bg-white border border-slate-200 w-2xl relative`}
        >
            <div>
                <p className="capitalize font-semibold text-xl underline">
                    {data?.title}
                </p>
                <p className="whitespace-pre-wrap mb-2">{data?.content}</p>
                <p>
                    Sale Date:{" "}
                    <span className="font-semibold">
                        {new Date(data?.saleDate).toDateString()}
                    </span>
                </p>
                <div className="absolute top-0 right-2">
                    <p
                        className="uppercase bg-red-400 text-white/95 text-xs rounded-full 
                                    px-6 py-0.5  mt-2 cursor-pointer hover:scale-105 transition duration-200"
                    >
                        important
                    </p>
                </div>
            </div>
        </article>
    );
};

export default NotificationToast;
