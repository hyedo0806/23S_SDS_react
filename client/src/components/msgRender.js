const DiaryItem = ({ id, author, message}) => {
  return (
    <div className="DiaryItem">
      <div className="info">
        <span className="author_info">
          {author} : {message}
        </span>
        <br />
        
      </div>
    </div>
  );
};

export default DiaryItem;