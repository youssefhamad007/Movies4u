import React from 'react';

const planData = {
  header: ['', 'Basic', 'Standard', 'Premium'],
  rows: [
    ['Price', '$9.99/Month', '$12.99/Month', '$14.99/Month'],
    [
      'Content',
      'Access to a wide selection of movies and shows, including some new releases.',
      'Access to a wider selection of movies and shows, including more new releases and exclusive content.',
      'Access to widest selection of movies and shows, including all new releases and Offline Viewing'
    ],
    [
      'Devices',
      'Watch on one device simultaneously',
      'Watch on Two devices simultaneously',
      'Watch on Four devices simultaneously'
    ],
    ['Free Trial', '7 Days', '7 Days', '7 Days'],
    ['Cancel Anytime', 'Yes', 'Yes', 'Yes'],
    ['HDR', 'No', 'Yes', 'Yes'],
    ['Dolby Atmos', 'No', 'Yes', 'Yes'],
    ['Ad-Free', 'No', 'Yes', 'Yes'],
    ['Offline Viewing', 'No', 'Yes, for select titles.', 'Yes, for all titles.'],
    ['Family Sharing', 'No', 'Yes, up to 5 family members.', 'Yes, up to 5 family members.'],
  ]
};

const PlansTable = () => {
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            {planData.header.map((cell, i) => (
              <th key={i} className="bg-[#232324] text-white p-4 text-left">{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planData.rows.map((row, idx) => (
            <tr
              key={idx}
              className="odd:bg-[#141414] even:bg-[#262626]"
            >
              {row.map((cell, i) => (
                <td key={i} className="p-4 text-[#b3b3b3]">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlansTable; 