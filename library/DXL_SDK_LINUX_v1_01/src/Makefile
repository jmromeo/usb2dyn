TARGET			 = libdxl.a
SHARED			 = libdxl.so
OBJS				 = dxl_hal.o dynamixel.o
SRCS				 = $(OBJS:.o=.c)
INCLUDEDIRS	+= -I../include
LIBDIRS			+= 
CFLAGS			 = $(INCLUDEDIRS) -W -Wall -O2 -fpic

CC			= gcc
AR			= ar

all: $(TARGET) $(SHARED)

$(TARGET): $(OBJS)
	$(AR) rs $@ $^
	cp $(TARGET) ../lib

$(SHARED): $(OBJS)
	$(CC) -shared -o $@ $^
	cp $(SHARED) ../lib

.c.o:
	$(CC) -c $< $(CFLAGS)

install:
	cp $(SHARED) /usr/lib/
	./set_dialout_group.sh
	
clean:
	rm -f $(OBJS) $(TARGET) $(SHARED)
	rm -f ../lib/$(SHARED) ../lib/$(TARGET)
	@echo "file deleted."

dep:
	gccmakedep $(SRCS)

