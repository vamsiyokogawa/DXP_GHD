import uuid from 'uuid/v4';

const optionSwither = (item) => {
  switch (item) {
    case 'Buttons':
      return {
        type: 'submit',
        name: 'Submit',
        label: 'Button Name',
      };

    case 'Dropdown':
      return {
        label: 'Lable Name',
        required: false,
        name: 'dropdown',
        options: [
          {
            id: uuid(),
            value: 'Option1'
          },
          {
            id: uuid(),
            value: 'Option2'
          }
        ],
      };

    case 'NumberInput':
      return {
        required: false,
        name: 'NumberInput',
        label: 'Lable Name',
        value: 0
      };
    
    case 'TextInput':
      return {
        required: false,
        name: 'TextInput',
        label: 'Lable Name',
        value: ''
      };
    case 'Date':
      return {
        required: false,
        label: 'Lable Name',
        value: new Date(),
        startDate: null,
        endDate: null
      }
    default:
      return;
  }
}

export default optionSwither;