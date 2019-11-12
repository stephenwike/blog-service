module.exports = {
    GetAll: async (type) => {
        return type.findAll();
    },
    GetFirst: async (type, where) => {
        return type.findOne({
            where
        });
    },
    GetById: async (type, typeId) => {
        return type.findOne({ where: { id: typeId } });
    },
    Create: async (type, model) => {
        return type.create(model);
    },
    Update: async (type, model) => {
        return type.update(model, { where: { id: model.id }, returning: {} });
    },
    Delete: async (type, model) => {
        if (!model || !model.id) return type.destroy({ where: { } });
        return type.destroy({ where: { id : model.id } })
    },
    GetPostObjectById: async (type, id) => {
        type.findOne({ where: { id }})
    }
}

function UpdateTransact(type, obj) {
    return sequelize.transaction(t => {
        return type.update(
            obj,
            {
                where: {
                    id: obj.id
                },
                returning: {
                    obj
                }
            },
            { transaction: t }).then(result => {
                return result;
            }).catch(err => {
                return err;
            });
    });
}