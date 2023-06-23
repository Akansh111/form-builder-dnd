import { H3 } from '@/components/typography/h3';
import { memo } from 'react';
import { INewSection, useList } from '../store/useList';

const Sections = [
  {
    id: 'blank',
    title: 'Blank Section',
    taskIds: [],
    elements: {},
  },
  {
    id: 'applicationInformation',
    title: 'Application Information',
    taskIds: ['FullName', 'DateOfBirth', 'Gender'],
    elements: {
      FullName: {
        id: 'FullName',
        content: 'Enter Your Full Name',
        element: {
          tagName: 'div',
          attributes: {
            style: {
              display: 'flex',
              flexDirection: 'column',
            },
          },
          children: [
            {
              tagName: 'div',
              innerHTML: 'Full Name',
            },
            {
              tagName: 'div',
              attributes: {
                style: {
                  display: 'flex',
                  flexDirection: 'row',
                },
              },
              children: [
                {
                  tagName: 'input',
                  tagType: 'closed',
                  attributes: {
                    type: 'text',
                    placeholder: 'First Name',
                  },
                },
                {
                  tagName: 'input',
                  tagType: 'closed',
                  attributes: {
                    type: 'text',
                    placeholder: 'Middle Name',
                  },
                },
                {
                  tagName: 'input',
                  tagType: 'closed',
                  attributes: {
                    type: 'text',
                    placeholder: 'Last Name',
                  },
                },
              ],
            },
          ],
        },
      },
      DateOfBirth: {
        id: 'DateOfBirth',
        content: 'Enter Your Date of Birth',
        element: {
          tagName: 'div',
          attributes: {
            style: {
              display: 'flex',
              flexDirection: 'column',
            },
          },
          children: [
            {
              tagName: 'div',
              innerHTML: 'Date of Birth',
            },
            {
              tagName: 'input',
              tagType: 'closed',
              attributes: {
                type: 'date',
              },
            },
          ],
        },
      },
      Gender: {
        id: 'Gender',
        content: 'Select Your Gender',
        element: {
          tagName: 'div',
          attributes: {
            style: {
              display: 'flex',
              flexDirection: 'column',
            },
          },
          children: [
            {
              tagName: 'div',
              innerHTML: 'Gender',
            },
            {
              tagName: 'select',
              children: [
                {
                  tagName: 'option',
                  attributes: {
                    value: 'male',
                  },
                  innerHTML: 'Male',
                },
                {
                  tagName: 'option',
                  attributes: {
                    value: 'female',
                  },
                  innerHTML: 'Female',
                },
                {
                  tagName: 'option',
                  attributes: {
                    value: 'other',
                  },
                  innerHTML: 'Other',
                },
              ],
            },
          ],
        },
      },
    },
  },
];

function AddSections() {
  const _addSection = useList((state) => state.addSection);

  const addSection = (index: number) => () => {
    const section = Sections[index] as INewSection;
    _addSection(section);
  };

  return (
    <div className='px-2 prose'>
      <H3>Add Sections</H3>

      <div className='flex flex-wrap gap-2'>
        {Sections.map((section, index) => (
          <button
            key={index}
            onClick={addSection(index)}
            className={` shadow transition-all flex flex-col  bg-gray-200 px-2 py-1 rounded-md border border-gray-300 overflow-hidden active:shadow-inner hover:shadow-md`}
          >
            <div className='px-3 font-semibold text-gray-900 select-none'>{`${section.title}`}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default memo(AddSections);
