create trigger xenonquery after insert on queries begin select xenonquery(NEW.id, NEW.query); end;
