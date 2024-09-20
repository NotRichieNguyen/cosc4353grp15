import React from "react";
import "./volunteerHistory.css";

const VolunteerHistory = () => {
  return (
    <div class="container">
        <h1>Volunteer History</h1>
        <table id="volunteer-history">
            <thead>
                <tr>
                    <th>Event Name</th>
                    <th>Event Description</th>
                    <th>Location</th>
                    <th>Required Skills</th>
                    <th>Urgency</th>
                    <th>Event Date</th>
                    <th>Participation Status</th>
                </tr>
            </thead>
            <tbody id="history-body">
                <tr>
                    <td>Community Cleanup</td>
                    <td>Helping clean the neighborhood park.</td>
                    <td>Park Avenue</td>
                    <td>Teamwork, Physical Strength</td>
                    <td>High</td>
                    <td>2024-09-15</td>
                    <td>Completed</td>
                </tr>
                <tr>
                    <td>Food Bank</td>
                    <td>Assisting in organizing food donations.</td>
                    <td>Downtown Center</td>
                    <td>Organization, Communication</td>
                    <td>Medium</td>
                    <td>2024-08-20</td>
                    <td>Pending</td>
                </tr>
            </tbody>
        </table>
    </div>
  );
};

export default VolunteerHistory;
