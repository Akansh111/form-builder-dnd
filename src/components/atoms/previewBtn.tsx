import { useList } from '../store/useList';

export default function PreviewBtn() {
  const isPreviewMode = useList((state) => state.isPreviewMode);
  const setPreviewMode = useList((state) => state.setPreviewMode);

  return (
    <div className='flex justify-center'>
      <button
        className='px-4 py-2 my-4 text-white bg-blue-500 rounded-md hover:bg-blue-700'
        onClick={() => setPreviewMode(!isPreviewMode)}
      >
        Turn {isPreviewMode ? 'off' : 'on'} Preview Mode
      </button>
    </div>
  );
}
