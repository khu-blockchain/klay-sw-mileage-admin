type getSwMileageTokenHistories = {
  query: {
    limit?: number;
    offset?: number;
    isCount: 0 | 1;
    order?: 'DESC' | 'ASC';
    lastId?: number;
    transactionType: 'mint' | 'burnFrom'
  }
}

export type {
  getSwMileageTokenHistories as getSwMileageTokenHistoriesRequest,
}
