const mutations = {
  async createItem( parent, args, ctx, info ) {
    // TODO login

    const data = {
      data: {
        ...args.data
      }
    };

    console.log(data);
    console.log(info);

    const item = await ctx.db.mutation.createItem( data, info );
    return item;
  },

  async updateItem( parent, args, ctx, info ) {
    // TODO login

    // copy updates from data
    const updates = {
      ...args.data
    };

    // remove id from updates
    delete updates.id;

    console.log(updates);
    console.log(info);

    const item = await ctx.db.mutation.updateItem( {
      data: updates,
      where: {
        id: args.data.id
      }
    }, info );
    return item;
  }
};

module.exports = mutations;

