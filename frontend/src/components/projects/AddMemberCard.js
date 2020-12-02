import React, {
    useState
} from "react";
import Popup from "reactjs-popup";

// eslint-disable-next-line react/prop-types
export default function AddMemberCard({ onSubmit, projects=[] }) {
    const [useremail, setUseremail] = useState("");
    const [projectId, setProjectId] = useState(null);

    function onSendInvite() {
        alert(`${projectId} ${useremail}`);
        const inviteData = { userEmail: useremail, projectId: projectId };
        onSubmit(inviteData, (res) => {
            console.log("Inivite done.", res);
        });
    }

    return (
        <div className="create-project-card">
            <div className="popup-container">
                <Popup
                    trigger={<button id="create-new-project"> + Add New Member</button>}
                    modal
                    nested>
                    {
                        close => (
                            <div className="modal">
                                <button className="close" onClick={close}>
                                    <i className="fas fa-times"></i>
                                </button>
                                <div className="header">Add Member</div>
                                <div className="content">
                                    <div className="popup-item flex-start">
                                        <h2 className="prompt">Project</h2>
                                        <select value={projectId} onChange={e => setProjectId(e.target.value)}>
                                            {projects.map((item) => {
                                                return <option key={item.id} value={item.id}>{item.title}</option>
                                            })}
                                        </select>
                                        <br />
                                        <h2 className="prompt">Email</h2>
                                        <input
                                            type="email"
                                            className="input-box"
                                            placeholder="useremail"
                                            value={useremail}
                                            onChange={e => setUseremail(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                </div>
                                <div className="flex-end">
                                    <button
                                        className="button"
                                        onClick={() => {
                                            onSendInvite();
                                            close();
                                        }}
                                    >
                                        Send Invite
                                    </button>
                                </div>

                            </div>

                        )}
                </Popup>

            </div>
        </div>

    );
}



