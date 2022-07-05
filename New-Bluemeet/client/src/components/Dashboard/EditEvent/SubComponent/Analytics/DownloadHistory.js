import React from 'react';
import styled from 'styled-components';
import ReportsDownloadHistoryDetailsCard from '../../GridComponents/ReportsDownloadHistory/DetailCards';
import ReportsDownloadHistoryListFields from '../../GridComponents/ReportsDownloadHistory/ListFields';

const DownloadHistory = () => {
    return (
        <>

<div className="session-content-grid px-3 mb-4">
<div className="basic-form-left-white px-4 py-4">
<ReportsDownloadHistoryListFields >

</ReportsDownloadHistoryListFields>
<ReportsDownloadHistoryDetailsCard />
<ReportsDownloadHistoryDetailsCard />
<ReportsDownloadHistoryDetailsCard />
<ReportsDownloadHistoryDetailsCard />
<ReportsDownloadHistoryDetailsCard />
</div>
</div>



        </>
    )
}

export default DownloadHistory;