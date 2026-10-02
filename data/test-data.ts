export default class TestData {
    static customerContact() {
        return [{ testID: "001", name: "Dhanashree", email: "dhanno123@demo.com", phone: "1234567890", message: "Unable to login" },
        { testID: "002", name: "Gauresh", email: "gaureshhappy223@rediff.com", phone: "1598635472", message: "Mismatch with account transactions" },
        { testID: "003", name: "Shirish", email: "shirish12365@abc.com", phone: "1986563214", message: "Unable to retrive past transactions" }

        ]
    }

    static postCallUserData(){
        return [{
            "id": 13,
            "email": "zen.ruff@reqres.in",
            "first_name": "Zen",
            "last_name": "Ruff",
            "avatar": "https://reqres.in/img/faces/13-image.jpg"
        }]
    }
}