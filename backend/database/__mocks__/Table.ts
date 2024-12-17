export const taskTableRepository = {
  scan: async () => {
    return {
      Items: [
        { id: 1, name: "task1" },
        { id: 2, name: "task2" },
      ],
    };
  },
};
