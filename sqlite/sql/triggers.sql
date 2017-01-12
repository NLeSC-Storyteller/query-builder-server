create trigger xenon_query after insert on queries begin select xenon_query(NEW.id, NEW.query); end;
