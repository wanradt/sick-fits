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
  }
};

module.exports = mutations;
