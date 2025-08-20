const EnergyBoilers = ({ details }: { details: any }) => {
    return (
        <div className="p-5">
            <div className="mb-5 text-gray-900 bg-white ">
                <p className="text-3xl font-semibold uppercase text-center">
                    {details?.name}
                </p>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {details?.User?.length > 0 && (
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-center text-gray-700 uppercase bg-gray-50 :bg-gray-700 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Member
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Lead Count
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {details?.User?.map((item: any) => (
                                <tr className="uppercase text-center odd:bg-white odd::bg-gray-900 even:bg-gray-50 even::bg-gray-800 border-b :border-gray-700 border-gray-200">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        {item?.name}
                                    </th>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {item?.LeadCount[0]?.count
                                            ? item?.LeadCount[0]?.count
                                            : 0}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default EnergyBoilers;
