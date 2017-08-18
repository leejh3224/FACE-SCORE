import React, { Component } from 'react'

class FacecardRank extends Component {
    render () {
        return (
            <table className="table column is-6 is-offset-4">
                <thead>
                    <tr>
                        <th>순위</th>
                        <th>유저명</th>
                        <th>게시글수</th>
                        <th>획득별점</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="has-text-centered">1. </td>
                        <td className="has-text-centered">이준호</td>
                        <td className="has-text-centered">1</td>
                        <td className="has-text-centered">4</td>
                    </tr>
                    <tr>
                        <td className="has-text-centered">2. </td>
                        <td className="has-text-centered">이준형</td>
                        <td className="has-text-centered">3</td>
                        <td className="has-text-centered">2</td>
                    </tr>
                    <tr>
                        <td className="has-text-centered">3. </td>
                        <td className="has-text-centered">Patrick Lee</td>
                        <td className="has-text-centered">2</td>
                        <td className="has-text-centered">1</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default FacecardRank