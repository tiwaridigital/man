export const formatDate = (originalDate) => {
  const date = new Date(originalDate);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return formattedDate;
};

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

export const tagsMaker = (title) => {
  return (
    <div
      className="text-gray-50 text-[14px] mt-8 mb-8"
      style={{ lineHeight: 1.5, opacity: 0.7 }}
    >
      <strong>Keywords: </strong> read {title}, {title} english, {title} eng,
      download
      {title} eng, read {title} online
    </div>
  );
};

export const metaKeywordsMaker = (title) => {
  return `read ${title.toLowerCase()}, ${title} english, ${title} eng,
      download
      ${title} eng, read ${title} online`
}

export const getFileExtension = (file) => {
  const fileSplit = file.split('.');
  const fileExtension = fileSplit[fileSplit.length - 1];
  return fileExtension;
};
