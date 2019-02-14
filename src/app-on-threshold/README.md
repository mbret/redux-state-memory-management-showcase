# Threshold strategy

This strategy allows a retention of items based of last used and a threshold
or memory usage. The combination aims to limit the re-fetch of items the user
might see again (ex: going back on the previous page). Adjusting the threshold
might gives a very smooth experience to the user.

## Description
An item is loaded when:
- An holder is active

*Items are loaded as the holders growths. There is no limit of maximum holders. Unless you decide to*

An item is removed when:
- There is no more holder
- The threshold is full or overflowed
- The item is the first to be removed in the queue
  
*The decision to cleanup an item from the threshold is LIFO*