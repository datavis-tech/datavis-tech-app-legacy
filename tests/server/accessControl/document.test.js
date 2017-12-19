import { allowRead, allowUpdate, allowDelete } from '../../../src/server/accessControl/document'

describe('document', () => {

  function test (operation, sut) {

    describe(operation, () => {

      it('it should allow if document is not private', async () => {
        expect(await sut(undefined, {isPrivate: false}, undefined, {agent: {session: {passport: {}}}})).toEqual(true)
      })

      it('it should allow if user is document owner', async () => {
        const id = String(Math.random())
        expect(await sut(undefined, {owner: id, isPrivate: true}, undefined, {agent: {session: {passport: {user: {id}}}}})).toEqual(true)
      })

      it('it should allow if user collaborates on document', async () => {
        const id = String(Math.random())
        expect(await sut(undefined, {collaborators: [{id}], isPrivate: true}, undefined, {agent: {session: {passport: {user: {id}}}}})).toEqual(true)
      })

      it('it should not allow in other case', async () => {
        const id = String(Math.random())
        expect(await sut(undefined, {collaborators: [{id}], isPrivate: true}, undefined, {agent: {session: {passport: {user: {id: '1'}}}}})).toEqual(false)
      })

    })

  }

  test('read', allowRead)
  test('update', (_, doc, __, req) => allowUpdate(_, doc, __, undefined, undefined, req))
  test('delete', allowDelete)

})
