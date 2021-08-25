import * as UserReducer from "./UserReducer"
// @ponicode
describe("UserReducer.default", () => {
    test("0", () => {
        let object: any = [{ id: 987650, name: "Pierre Edouard", email: "something@example.com", isChild: true, isSignedIn: true, children: [] }, { id: 12345, name: "Jean-Philippe", email: "ponicode.com", isChild: false, isSignedIn: true, children: [] }, { id: 987650, name: "Edmond", email: "something.example.com", isChild: false, isSignedIn: false, children: [] }, { id: "bc23a9d531064583ace8f67dad60f6bb", name: "Michael", email: "something@example.com", isChild: false, isSignedIn: true, children: [] }, { id: 56784, name: "Edmond", email: "user1+user2@mycompany.com", isChild: false, isSignedIn: false, children: [] }]
        let callFunction: any = () => {
            UserReducer.default("Abruzzo", { type: undefined, user: { id: "a1969970175", name: "Edmond", email: "ponicode.com", isChild: false, isSignedIn: false, children: object } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let object: any = [{ id: 12, name: "Jean-Philippe", email: "bed-free@tutanota.de", isChild: false, isSignedIn: false, children: [] }, { id: 56784, name: "Pierre Edouard", email: "something@example.com", isChild: false, isSignedIn: false, children: [] }, { id: 12, name: "Jean-Philippe", email: "user@host:300", isChild: true, isSignedIn: false, children: [] }, { id: "bc23a9d531064583ace8f67dad60f6bb", name: "Jean-Philippe", email: "user@host:300", isChild: false, isSignedIn: false, children: [] }]
        let callFunction: any = () => {
            UserReducer.default("Abruzzo", { type: undefined, child: { id: 56784, name: "Jean-Philippe", email: "something.example.com", isChild: false, isSignedIn: true, children: object } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let object: any = [{ id: "bc23a9d531064583ace8f67dad60f6bb", name: "George", email: "user1+user2@mycompany.com", isChild: false, isSignedIn: false, children: [] }, { id: 56784, name: "George", email: "something@example.com", isChild: false, isSignedIn: false, children: [] }, { id: "a1969970175", name: "Jean-Philippe", email: "bed-free@tutanota.de", isChild: true, isSignedIn: false, children: [] }, { id: 56784, name: "Edmond", email: "TestUpperCase@Example.com", isChild: false, isSignedIn: true, children: [] }]
        let callFunction: any = () => {
            UserReducer.default(false, { type: undefined, child: { id: 56784, name: "Pierre Edouard", email: "user1+user2@mycompany.com", isChild: false, isSignedIn: false, children: object } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let object: any = [{ id: 12, name: "Anas", email: "user1+user2@mycompany.com", isChild: true, isSignedIn: false, children: [] }, { id: 12345, name: "Edmond", email: "email@Google.com", isChild: false, isSignedIn: false, children: [] }, { id: "a1969970175", name: "Anas", email: "user@host:300", isChild: true, isSignedIn: true, children: [] }, { id: 987650, name: "George", email: "user1+user2@mycompany.com", isChild: false, isSignedIn: true, children: [] }]
        let callFunction: any = () => {
            UserReducer.default({ user: "Anas" }, { type: undefined, child: { id: 987650, name: "Pierre Edouard", email: "email@Google.com", isChild: false, isSignedIn: false, children: object } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let object: any = [{ id: 56784, name: "George", email: "something.example.com", isChild: true, isSignedIn: false, children: [] }, { id: 12, name: "Pierre Edouard", email: "user1+user2@mycompany.com", isChild: true, isSignedIn: true, children: [] }, { id: "bc23a9d531064583ace8f67dad60f6bb", name: "Edmond", email: "email@Google.com", isChild: true, isSignedIn: true, children: [] }, { id: 12, name: "George", email: "user1+user2@mycompany.com", isChild: false, isSignedIn: true, children: [] }]
        let callFunction: any = () => {
            UserReducer.default(true, { type: undefined, child: { id: 12345, name: "Jean-Philippe", email: "email@Google.com", isChild: true, isSignedIn: false, children: object } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            UserReducer.default({ user: "" }, { type: undefined, child: { id: Infinity, name: "", email: "", isChild: true, isSignedIn: false, children: [] } })
        }
    
        expect(callFunction).not.toThrow()
    })
})
