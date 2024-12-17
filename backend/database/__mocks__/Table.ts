const mockItems: Record<string, unknown>[] = [];

export const setMockItems = (
  {
    items,
  }: {
    items: Record<string, unknown>[];
  } = { items: [] }
) => {
  mockItems.length = 0;
  mockItems.push(...items);
};

export const taskTableRepository = {
  scan: async () => {
    return {
      Items: mockItems,
    };
  },
};
