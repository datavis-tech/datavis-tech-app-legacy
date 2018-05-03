import { observable, computed, action } from 'mobx';
import { type } from 'ot-json0'
import Document from './document';

module.exports = function DocumentStore(socket) {
    const documents = observable.array([]);
    const recentIds = observable.array([]);

    const recent = computed(() => recentIds.map(findDocumentById));

    socket.on('change', action((id, diff) => {
        const document = documents.find(d => d.id === id)
        if (document) {
            type.apply(document, diff)
        }
    }))

    return {
        get recent() {
            return recent.get();
        },

        addRecent: action(addRecent)
    };

    function addRecent(documentProperties) {
        const dedupedDocumentProperties = documentProperties.filter(
            dp => !findDocumentById(dp.id)
        );

        rememberRecentIds(dedupedDocumentProperties.map(dp => dp.id));
        add(documentProperties);
    }

    function add(documentProperties) {
        documentProperties
          .map(Document)
          .forEach(d => {
            documents.push(d);
            socket.emit('subscribe', { id: d.id })
          });
    }

    function rememberRecentIds(ids) {
        recentIds.push(...ids);
    }

    function findDocumentById(id) {
        return documents.find(d => d.id === id);
    }
};
