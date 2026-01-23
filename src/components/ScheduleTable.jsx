
export default function ScheduleTable({meets}){
    return(
        <div className="table-wrapper">
            <h2 className="section-title">Race Schedule</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Meet</th>
                        <th scope="col">Location</th>
                        <th scope="col">Type</th>
                    </tr>
                </thead>

                <tbody>
                    {meets.map((m) =>(
                        <tr key={m.id}>
                            <td>
                                <span className="date">{m.table.data}</span>
                            </td>
                            <td>{m.table.meet}</td>
                            <td>{m.table.location}</td>
                            <td>
                                <span className={`type ${m.table.typeClass}`}>
                                    {m.table.typeLabel}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}