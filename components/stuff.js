const createCard = (result) => {
    const card = new Card(result, currentUserId, '#template-card', {
        handleClick: () => {
            popupWithImage.open(result.name, result.link);
        },
        handleDelete: () => {
            popupConfirmDel.setSubmitAction(() => {
                api.removeCard(card.getId()).then(() => {
                    card.removeCard(); // а вот эта часть не срабатывает
                    popupConfirmDel.close();
                }).catch(err => {
                    console.log(err)
                })
            });
            popupConfirmDel.open();
        },
        handleLikeCatd: () => {}
    });
    const cardItem = card.generateCard();
    return cardItem
}


export default class PopupConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
    }
    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__button').addEventListener('click', () => {
            this.setSubmitAction;
            console.log(this.setSubmitAction); // Консоль лог срабатывает
        });
    }
    setSubmitAction(submitAction) {
        this._handleSubmitCallback = submitAction;
    }
}