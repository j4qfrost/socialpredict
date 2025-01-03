import React from 'react';
import MarketDetailsTable from '../../components/marketDetails/MarketDetailsLayout.jsx';
import { useMarketDetails } from '../../hooks/useMarketDetails.jsx';
import { useAuth } from '../../helpers/AuthContent.jsx';
import ResolveModalButton from '../../components/modals/resolution/ResolveModal.jsx';
import BetModalButton from '../../components/modals/bet/BetModal.jsx';
import LoadingSpinner from '../../components/loaders/LoadingSpinner.jsx';

const MarketDetails = () => {
  const { username } = useAuth();
  const { details, isLoggedIn, token, refetchData, currentProbability } =
    useMarketDetails();

  if (!details) {
    return <LoadingSpinner />;
  }

  const isCreator = username === details?.creator?.username;
  const isResolved = details?.market?.isResolved === true;
  const isActive = new Date(details?.market?.resolutionDateTime) > new Date();

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-grow overflow-y-auto'>
        <MarketDetailsTable
          market={details.market}
          creator={details.creator}
          numUsers={details.numUsers}
          totalVolume={details.totalVolume}
          currentProbability={currentProbability}
          probabilityChanges={details.probabilityChanges}
          marketId={details.market.id}
        />
      </div>
      <div className='flex items-center justify-center mb-8 space-x-4 py-4'>
        {isCreator && !isResolved && (
          <ResolveModalButton
            marketId={details.market.id}
            token={token}
            disabled={!token}
            className='text-xs px-4 py-2'
          />
        )}
        {!isResolved && isLoggedIn && isActive && (
          <BetModalButton
            marketId={details.market.id}
            token={token}
            disabled={!token}
            onTransactionSuccess={refetchData}
            className='text-xs px-4 py-2'
          />
        )}
      </div>
    </div>
  );
};

export default MarketDetails;
