export namespace TodosModel {
	export interface ITodayModel {
		data: {
			data: {
				curPage: number,
				size: number,
				totalCount: number,
				totalPage: number,
				toDoList: ITodayListModel
			},
		},
	}

	export interface ITodayListModel {
        id: number,
        title: string,
        pets: [
          {
            id: number,
            name: string,
          }
        ],
        isAllDay: boolean,
        date: string,
        time: string,
        isUsingAlarm: boolean,
        color: string,
        completeProfileImage: string,
        completeDateTime: string
	}
}