import {Button, Modal} from "react-bootstrap";
import {postReportCoronaPositive} from "../../api/requests";
import {toast} from "react-toastify";

export const CoronaPositiveModal = (props) => {

    const handleClick = () => {
        postReportCoronaPositive(props.user).then(() => {
            props.handleClose();
            props.reloadData();
            toast.warn('Wir haben den Kontakt gemeldet. Danke!')
        }).catch(() => {
            toast.error('Es ist ein Fehler aufgetreten. Bitte probiere es ereut. Sollte der Fehler erneut ' +
                'auftreten, wende dich sofort an die IT!')
        })
    }


    return (<Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>Ich bin Corona Positiv</Modal.Header>
        <Modal.Body>
            <p className="text-danger">Bitte beachte, dass diese Meldung nicht rückgängig gemacht werden kann.
                Dein QR-Code wird für die nächsten zwei Wochen gesperrt und du wirst keine Veranstaltungen
                besuchen
                können!</p>
            <p className="text-secondary">Wir teilen außerdem anderen Studenten im gleichen Kurs mit, dass es
                einen
                Vorfall gibt. Dein Identität wird nicht preisgegeben!</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>Schließen</Button>
            <Button variant="danger" onClick={handleClick}>Vorfall melden!</Button>
        </Modal.Footer>
    </Modal>)
}
