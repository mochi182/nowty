import './AddActivity.css'
import '../assets/Buttons.css'
import '../assets/Forms.css'

export function AddActivity() {
    return (
        <>
            <form id="addForm" className="">

                <div className="form-group">
                    <label for="actividad-input">Nueva actividad:</label>
                    <input className="form-control" type="text" id="actividad-input" name="actividad-input" required />
                </div>

            </form>

            <center>
                <button className="customButton primary addActivityButtons" id="addButton">
                    Add
                </button>

                <button className="customButton primary addActivityButtons">
                    Clear
                </button>

                <a href="advanced" className="overrideLinkStyle customButton outline-primary addActivityButtons">🚀</a>
            </center>
        </>
    )
}